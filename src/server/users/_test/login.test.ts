import { login } from '../login';
import { Session } from '../login';
import { getClient } from '../../serverdb';
import bcrypt from 'bcrypt';
import { hashPassword } from '../signup';

jest.mock('getClient');

const mockedGetClient = jest.mocked(getClient);

describe(`login`, () => {
  const user = {
    email: `jordan@lindley.com`,
    password: `1234`,
    id: `1ca6ec11-1ca4-421d-be78-44bed3ca8e85`,
  };

  let queryFn = jest.mock;

  const mockQueryFn = (userLookupRes: unknown[], insertRes: unknown[]) => {
    queryFn = jest
      .fn()
      .mockResolvedValueOnce({ rows: userLookupRes })
      .mockResolvedValueOnce({ rows: insertRes });
    mockedGetClient.mockReturnValueOnce(
      // @ts-expect-error we're not mocking _everything_ on this client.
      Promise.resolve({
        query: queryFn,
      })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test(`should pass when given correct email and password`, async () => {
    mockQueryFn(
      [
        {
          id: user.id,
          email: user.email,
          digest: hashPassword(user.password),
        },
      ],
      [user.id, new Date()]
    );
    const token = await login(user.email, user.password);
    expect(token).not.toBeNull();
    expect(queryFn).toHaveBeenCalledTimes(2);
    expect(queryFn).nthCalledWith(
      1,
      `SELECT * FROM users WHERE email = $1 RETURNING email, id, digest`,
      [user.email]
    );
    expect(queryFn).nthCalledWith(
      2,
      `INSERT INTO sessions (hashed_access_token, expires_at, user_id) VALUES ($1, $2, $3) RETURNING user_id, expires_at;`,
      [expect.anything(), expect.anything(), user.id]
    );
  });

  test(`should throw an error when the user inputted email does not match`, async () => {
    mockQueryFn(
      [
        {
          id: user.id,
          email: 'someone@user.com',
          digest: hashPassword(user.password),
        },
      ],
      []
    );
    const token = await login(`someone@user.com`, user.password);
    expect(token).toThrow('email not found!');
  });

  test(`should throw an error when the user inputted password does not match`, async () => {
    mockQueryFn(
      [
        {
          id: user.id,
          email: user.email,
          digest: hashPassword('some other password'),
        },
      ],
      []
    );
    const token = await login(user.email, 'some other password');
    expect(token).toThrow('password incorrect!');
  });
});
