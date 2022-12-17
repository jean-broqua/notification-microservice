import { IsNotEmpty, IsUUID, Length } from 'class-validator';

export class CreateNotificaitonBody {
  @IsNotEmpty()
  @IsUUID()
  recipiantId: string;

  @IsNotEmpty()
  @Length(5, 240)
  content: string;

  category: string;
}
