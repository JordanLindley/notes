import { signup } from '../signup';
import { getClient } from '../../serverdb';
import { hashPassword } from '../signup';

jest.mock('../../serverdb');

const mockedGetClient = jest.mocked(getClient);

describe('signup', () => {
  const user = {
    email: 'jordan@lindley.com',
    password: '1234',
    id: '1ca6ec11-1ca4-421d-be78-44bed3ca8e85',
  };

  let queryFn = jest.mock;

  const mockQueryFn = (
    insertUserRes: unknown[],
    insertSessionRes: unknown[] = []
  ) => {
    queryFn = jest
      .fn()
      .mockResolvedValueOnce({ rows: insertUserRes })
      .mockResolvedValueOnce({ rows: insertSessionRes });
    mockedGetClient.mockReturnValueOnce(
      // @ts-expect-error we're not mocking _everything_ on this client.
      Promise.resolve({
        query: queryFn,
        end: async () => Promise.resolve(),
      })
    );
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should create a user and session when given an email and password', async () => {
    mockQueryFn([
      {
        id: user.id,
        email: user.email,
      },
    ]);
    const { id, email, accessToken } = await signup(user.email, user.password);
    expect(id).not.toBeNull();
    expect(email).toEqual(user.email);
    expect(accessToken).not.toBeNull();
    expect(queryFn).toHaveBeenCalledTimes(2);
    expect(queryFn).nthCalledWith(
      1,
      'INSERT INTO users (email, digest) VALUES ($1, $2) RETURNING id, email;',
      [user.email, expect.anything()]
    );
    expect(queryFn).nthCalledWith(
      2,
      'INSERT INTO sessions (hashed_access_token, expires_at, user_id) VALUES ($1, $2, $3) RETURNING user_id, expires_at;',
      [expect.anything(), expect.anything(), user.id]
    );
  });
});
