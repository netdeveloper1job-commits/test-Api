import { CreateLocationDto } from './dto/request/create-location.dto';
import { UpdateLocationDto } from './dto/request/update-location.dto';
import { LocationWithResponse } from './dto/response/location-with-response';
import { LocationService } from './location.service';
export declare class LocationController {
    private readonly locationService;
    constructor(locationService: LocationService);
    create(createLocationDto: CreateLocationDto, req: any): Promise<LocationWithResponse>;
    findAll(search: string): Promise<LocationWithResponse>;
    findOne(id: string): Promise<LocationWithResponse>;
    updateById(id: string, body: UpdateLocationDto, req: any): Promise<LocationWithResponse>;
    remove(id: string, req: any): Promise<LocationWithResponse>;
}
