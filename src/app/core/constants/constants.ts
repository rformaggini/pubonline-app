export class Constants {
  public static readonly nameRegex: string = '[a-zA-Z0-9 ]*';
  public static readonly emailRegex: string =
    '[A-Za-z0-9._%-]+@[A-Za-z0-9._%-]+\\.[a-z]{2,3}';
  public static readonly contactNumberRegex: string = '^[e0-9]{10,10}$';
  public static readonly onlyNumberRegex: string = '^[0-9]*$';
  public static readonly error: string = 'error';
}
