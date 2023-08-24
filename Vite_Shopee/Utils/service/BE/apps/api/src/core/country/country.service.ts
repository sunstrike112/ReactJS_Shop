import { Injectable, NotFoundException } from '@nestjs/common';
import csc from 'country-state-city';
import { ICountry, IState, ICity } from 'country-state-city';
import { MSG_NOT_FOUND_ITEM } from '@constants/messages.constant';
import { PrismaService } from '@core/prisma/prisma.service';
import { from } from 'rxjs';
import { groupBy, mergeMap, toArray } from 'rxjs/operators';

@Injectable()
export class CountryService {

  constructor(
    private prisma: PrismaService,
  ) {}

  getAllCountries() {
    return { items: csc.getAllCountries() };
  }

  getCountryByCode(countryCode: string) {
    const country: ICountry | string = csc.getCountryByCode(countryCode);
    if (typeof country === 'string') throw new NotFoundException(MSG_NOT_FOUND_ITEM);
    return country;
  }

  getStatesOfCountry(countryCode: string) {
    const country = csc.getStatesOfCountry(countryCode);
    return { items: country };
  }

  getStateByCodeAndCountry(stateCode: string, countryCode: string) {
    const state: IState | string = csc.getStateByCodeAndCountry(stateCode, countryCode);
    if (typeof state === 'string') throw new NotFoundException(MSG_NOT_FOUND_ITEM);
    return state;
  }

  getCitiesOfCountry(countryCode: string) {
    const cities = csc.getCitiesOfCountry(countryCode);
    return { items: cities };
  }

  getCitiesOfState(stateCode: string, countryCode: string) {
    const cities = csc.getCitiesOfState(countryCode, stateCode);
    return { items: cities };
  }

  async getStateSuburbOfPostCode(countryCode, postCode) {
    // Currently only support Country is AU
    let metadata = {}
    if (countryCode != 'AU') return { items: [], metadata: metadata };
    const suburbs = await this.prisma.suburb.findMany({
      where: {
        postCode: postCode
      }
    });

    if (suburbs && suburbs.length > 0) {
      metadata['stateIsoCode'] = suburbs[0].stateIsoCode;
      metadata['stateName'] = suburbs[0].stateName;
      metadata['countryCode'] = countryCode;
      metadata['countryName'] = 'Australia';
    }

    return { items: suburbs, metadata: metadata };
  }
}
