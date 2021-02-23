import {AggregateRoot} from "@nestjs/cqrs";
import UserAuthenticatedEvent from "./user-authenticated.event.";

class UserViewDto extends AggregateRoot {
    
    constructor(readonly email: string, readonly friend_code: string) {
        super();
    }
    
    userAuthenticated(): void {
        this.apply(new UserAuthenticatedEvent(this.email))
    }
}
export default UserViewDto;