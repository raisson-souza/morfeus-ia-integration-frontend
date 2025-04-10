import Endpoints from "./base/Endpoints"

export default abstract class AuthService extends Endpoints {
    static async DirectAccess() {
        return await this.Post<string>({
            url: "/accesses/direct_access"
        })
    }
}