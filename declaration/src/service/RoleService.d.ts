export declare enum EGender {
    None = 0,
    Man = 1,
    Woman = 2
}
export declare class VirtualFigure {
    skinIds: number[];
    cover: string;
    state: number;
}
export declare class VirtualAvatar {
    figure: VirtualFigure[];
    aid: number;
    skinIds: number[];
    avatar: string;
}
export declare class VirtualRoleInfo {
    man: VirtualAvatar;
    woman: VirtualAvatar;
    gender: EGender;
    bid: number;
    uid: number;
}
export declare class VirtualRole {
}
export declare class RoleService {
    protected _server_base_url: string;
    protected _roles: {
        [uid: number]: VirtualRole;
    };
    init(uid: number): Promise<void>;
    getAvatarByRoleInfo(vri: VirtualRoleInfo): VirtualAvatar;
}
