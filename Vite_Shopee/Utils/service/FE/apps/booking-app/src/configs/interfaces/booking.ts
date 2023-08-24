export interface BookingService {
  id: number;
  name: string;
  description: string;
  image: string;
  selectType: string;
  selected: boolean;
  note: string;
  packages: BookingPackage[];
}

export interface BookingPackage {
  id: number;
  serviceId: number;
  name: string;
  description: string;
  outlinedImage: string;
  solidImage: string;
  selected: boolean;
}

export const convertBookingService = (service) => {
  const res: BookingService = {
    id: service.id,
    name: service.name,
    description: service.description,
    image: service.image,
    selectType: service.selectType,
    selected: false,
    note: '',
    packages: service.packages.map(item => convertBookingPackage(item))
  };

  return res;
}

const convertBookingPackage = (item) => {
  const res: BookingPackage = {
    id: item.id,
    serviceId: item.serviceId,
    name: item.name,
    description: item.description,
    outlinedImage: item.outlinedImage,
    solidImage: item.solidImage,
    selected: false
  }

  return res;
}