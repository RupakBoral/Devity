# DEVITY

A platform where all developers connect.

## Technologies Used

- JWT : token creation and validation
- CORS : allows to make api call from frontend to backend irrespective of different domain names and ip
- Axios : instead of fetch axios is used to make api calls
- validator to validate email and password

## CORS

- { origin: "http://localhost:5173",
  credentials: true
  }
- when making an api call, pass { withCredentials: true } as an argument

## Building APIs

- POST /signup
- POST /login
- POST /logout

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

- POST /request/send/interested/:userId
- POST /request/send/ignored/:userId

- POST /request/review/accepted/:requestedId
- POST /request/review/rejected/:requestedId

- GET /connections
- GET /requests/received
- GET /feed - gets the profiles

## Paging

at a time only fetch 10 users
/feed?page=1&limit=10 => 01 - 10 users => .skip(0) .limit(10)
/feed?page=2&limit=10 => 11 - 20 users => .skip(10) .limit(10)
/feed?page=3&limit=10 => 21 - 30 users => .skip(20) .limit(10)
and so on...
const skip = (page X limit) - limit;
