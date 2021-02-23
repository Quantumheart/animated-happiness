import ConfirmEmailCommand from "./confirm-email.command"
import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {EmailService} from "../../services/email/email.service";

@CommandHandler(ConfirmEmailCommand)
export class ConfirmEmailCommandHandler implements ICommandHandler<ConfirmEmailCommand> {
    constructor(private readonly emailService: EmailService) {
    }

    execute(command: ConfirmEmailCommand): Promise<boolean> {
        // todo finish email 
        return Promise.resolve(false);
    }
}