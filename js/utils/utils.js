export class Utils {
  /**
   * Devuelve un número aleatorio entre 1 y 10
   * @returns {number} Un número aleatorio entre 1 y 10
   */
  static getRandomNumber() {
    const random = Math.random();
    const multiplied = random * 10;
    const rounded = Math.floor(multiplied);
    const result = rounded + 1;

    return result;
  }

  /**
   * Genera un identificador único para la cita en formato YYMMDDHHMMNN
   * @description El método genera un ID basado en la fecha y hora actual, formateado como YYMMDDHHMMNN
   * @returns {string} Identificador único en formato YYMMDDHHMMNN
   * @example "260305090001" para una cita en el 2026-03-05 a las 09:00 y el número 01
   */
  static generarId() {
    const now = new Date();
    const year = String(now.getFullYear()).slice(-2);
    const month = String(now.getMonth() + 1).padStart(2, '0'); //
    const day = String(now.getDate()).padStart(2, '0');
    const hour = String(now.getHours()).padStart(2, '0');
    const minute = String(now.getMinutes()).padStart(2, '0');
    const randomNumber = this.getRandomNumber();

    return `${year}${month}${day}${hour}${minute}${randomNumber}`;
  }

  static generateUserName(usrName = 'usr', cod = this.getRandomNumber()) {
    return `${usrName}${cod}`;
  }

  // TODO: Crear la clase Utils "static" que se puedan usar sus metodos sin instanciar la clase
}
