import { faker } from '@faker-js/faker';
import dayjs from 'dayjs';
import Cryptr from 'cryptr';
import dotenv from 'dotenv';

import * as companyRepository from '../repositories/companyRepository';
import * as employeeRepository from '../repositories/employeeRepository';
import * as cardRepository from '../repositories/cardRepository';

import { makeCardName } from '../utils/transform';

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY || 'secret';
const cryptr = new Cryptr(SECRET_KEY);

// Local functions

// This part is to make sure that the provided API key has a company related to it
async function searchCompanyWithKey(key: string) {
  const company: companyRepository.Company = await companyRepository.findByApiKey(key);
  if (!company) {
    throw { type: 'noCompany', message: 'There are no companies with the provided API key.' };
  }

  return company;
}

// This part is to make sure that the employee exists and is part of the company
async function searchEmployeeInsideCompany(
  employeeId: number,
  company: companyRepository.Company
) {
  const employee: employeeRepository.Employee = await employeeRepository.findById(employeeId);
  if (!employee) {
    throw { type: 'noEmployee', message: 'There is no employee with the provided ID.' };
  }
  if (employee.companyId !== company.id) {
    throw {
      type: 'employeeFromAnotherCompany',
      message: 'This employee is associated with another company.'
    };
  }

  return employee;
}

// This part is to make sure that the employee doesn't already have a card
// with the type he is trying to register
async function searchExistingCard(
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const currentCard: cardRepository.Card = await cardRepository
    .findByTypeAndEmployeeId(cardType, employeeId);
  if (currentCard) {
    throw {
      type: 'duplicateCard',
      message: 'Each employee is only allowed to have 1 card from a given type.'
    };
  }
}

function generateNewCard(
  employee: employeeRepository.Employee,
  cardType: cardRepository.TransactionTypes
): cardRepository.CardInsertData {
  const number: string = faker.finance.creditCardNumber();
  const cardholderName: string = makeCardName(employee.fullName);
  const expirationDate: string = dayjs().add(5, 'year').format('MM/YY');
  const CVC: string = faker.finance.creditCardCVV();
  const securityCode: string = cryptr.encrypt(CVC);
  const newCard: cardRepository.CardInsertData = {
    number,
    cardholderName,
    expirationDate,
    securityCode,
    employeeId: employee.id,
    isVirtual: false,
    isBlocked: false,
    type: cardType,
  };
  return newCard;
}

// Global functions
export async function createNewCard(
  APIKey: string,
  employeeId: number,
  cardType: cardRepository.TransactionTypes
) {
  const company: companyRepository.Company = await searchCompanyWithKey(APIKey);
  const employee: employeeRepository.Employee = await searchEmployeeInsideCompany(
    employeeId,
    company
  );
  await searchExistingCard(employeeId, cardType);
  const newCard: cardRepository.CardInsertData = generateNewCard(employee, cardType);

  await cardRepository.insert(newCard);
  return newCard;
}
