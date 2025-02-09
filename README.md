# DEVITY

A platform where all developers connect.

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
