import bcrypt from "bcrypt";

export class HashPassword {
  public static async hash(password: string): Promise<string> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hashSync(password, saltRounds);
    return hashedPassword;
  }

  public static async check(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compareSync(password, hashedPassword);
  }
}
