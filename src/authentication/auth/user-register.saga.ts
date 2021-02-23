import {ICommand, ofType, Saga} from "@nestjs/cqrs";
import {Injectable} from "@nestjs/common";
import {Observable} from "rxjs";
import UserAuthenticatedEvent from "../../models/user/user-authenticated.event.";
import {map} from "rxjs/operators";
import ConfirmEmailCommand from "./confirm-email.command";

@Injectable()
export class UserRegisterSaga {
    @Saga()
    userLoggedIn = (events$: Observable<UserAuthenticatedEvent>): Observable<ICommand> => {
        return events$.pipe(
            ofType(UserAuthenticatedEvent),
            map((event) => new ConfirmEmailCommand(event.email)),
        );
    }
}