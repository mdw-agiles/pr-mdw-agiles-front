export class ApiEndpoint {
  public static USERS = '/users';
  public static RESERVATION = '/reservation';
  public static RESERVATION_SEARCH = ApiEndpoint.RESERVATION + '/search';
  public static RESERVATION_RESERVATION = ApiEndpoint.RESERVATION + '/reservation';
  public static HOTEL_CHAINS = '/chains';
  public static HOTEL = '/hotels';
  public static HOTEL_SEARCH = ApiEndpoint.HOTEL + '/search';
  public static ROOM = '/rooms';
  public static ROOM_SEARCH = ApiEndpoint.ROOM + '/search';
  public static BOOKED_DATE = 'booked-date-times';
}
