import { CreateInputDetailDto } from './dto/request/create-input-detail.dto';
import { UpdateInputDetailDto } from './dto/request/update-input-detail.dto';
import { InputDetailWithResponse } from './dto/response/input-detail-with-response';
import { InputDetailsService } from './input-details.service';
export declare class InputDetailsController {
    private readonly inputDetailsService;
    constructor(inputDetailsService: InputDetailsService);
    create(createInputDetailDto: CreateInputDetailDto, req: any): Promise<InputDetailWithResponse>;
    findAll(search: string): Promise<InputDetailWithResponse>;
    findOne(id: string): Promise<InputDetailWithResponse>;
    updateById(id: string, body: UpdateInputDetailDto, req: any): Promise<InputDetailWithResponse>;
    remove(id: string, req: any): Promise<InputDetailWithResponse>;
}
