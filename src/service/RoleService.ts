export enum EGender
{
    None,
    Man,
    Woman
}
export class VirtualFigure
{
    skinIds:number[]=[]
    cover=""
    state=-1
}
export class VirtualAvatar
{
    figure:VirtualFigure[]=[]
    aid=-1
    skinIds:number[]=[]
    avatar=""
}
export class VirtualRoleInfo
{
    man:VirtualAvatar=null
    woman:VirtualAvatar=null
    gender=EGender.None
    bid=-1
    uid=-1
}
export class VirtualRole
{

}
export class RoleService
{
    protected _server_base_url="http://10.10.1.90:8088"
    protected _roles:{[uid:number]:VirtualRole}={}
    async init(uid:number)
    {
        var req_save = this._server_base_url + "/moment/user/skin/saved";
        var res_save = await fetch(req_save,{
            method:"post",
            mode:"cors",
            headers:{
                "Access-Control-Allow-Origin":"*"
            },
            body:JSON.stringify({
                uid:[uid]
            })
        })
        var text = await res_save.text()
        var vr:VirtualRole=JSON.parse(text)
        this._roles[uid]=vr
        console.log(vr)
    }
    getAvatarByRoleInfo(vri:VirtualRoleInfo)
    {
        if(!vri)
        {
            return null
        }
        if(vri.gender==EGender.Man)
        {
            return vri.man
        }
        return vri.woman
    }
}