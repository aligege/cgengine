import { cg } from "./framework/global";
import { RoleService } from "./service/RoleService";

export class global extends cg.global
{
    static roleSer=new RoleService()
}