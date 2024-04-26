import express, { Request, Response, Router } from 'express';
import MessageResponse from '../interfaces/MessageResponse';
import { supabase } from '../utils/supabase';
import { Tables } from '../types/database.types';
import { ErrorResponseType } from '../types/response';
import { generateUniqueIdFromHex } from '../utils/utils';

const router: Router = express.Router();

type GetAllUsersWithIndexTypeRequestParams = {
  from: number,
  to: number,
};

type CreateUserRequestBody = Tables<'users'>;
type ApiHelperResponse = Array<{ path: string, description: string, method: 'GET' | 'POST', usage: string, return: string, payload?: {} }>;

// Get all users
router.get('/', async (req: Request, res: Response<Tables<'users'>[] | ErrorResponseType>) => {
  const { data, error } = await supabase.from('users').select('*').order('firstName', { ascending: true, nullsFirst: false });
  if (data == null) {
    return res.json({ error: error.message, stack: error.details, code: 400 });
  }
  return res.json(data);
});
// Display help on endpoints
router.get('/help', async (req: Request, res: Response<ApiHelperResponse>) => {
  const result: ApiHelperResponse = [
    {
      path: '/',
      method: 'GET',
      description: 'Get all users',
      usage: '( GET ) /',
      return: `{
        bmi: number | null;
        createdAt: string;
        email: string | null;
        enrolledCourses: Json[] | null;
        firstName: string | null;
        height: number | null;
        id: string;
        lastName: string | null;
        phoneNumber: string | null;
        profileImage: string | null;
        username: string | null;
        weight: number | null;
      }[] | null`,
      payload: {},
    },
    {
      path: '/help',
      method: 'GET',
      description: 'Display this list.',
      usage: '( GET ) /help',
      return: 'this',
      payload: {},
    },
    {
      path: '/:from&:to',
      method: 'GET',
      description: 'Paginate users. Get from - to ammount of users, starting with index <from> and ending with index <to>',
      usage: '( GET ) /?from=VALUE&to=VALUE',
      return: `{
        bmi: number | null;
        createdAt: string;
        email: string | null;
        enrolledCourses: Json[] | null;
        firstName: string | null;
        height: number | null;
        id: string;
        lastName: string | null;
        phoneNumber: string | null;
        profileImage: string | null;
        username: string | null;
        weight: number | null;
      }[] | null`,
      payload: {},
    },
    {
      path: '/',
      method: 'POST',
      description: 'Paginate users. Get from - to ammount of users, starting with index <from> and ending with index <to>',
      usage: '( POST ) /',
      payload: {
        // required
        description: "Do not provide required or optional keys. Only provide their nested keys: { firstName: 'VALUE', ... }",
        required: {
          firstName: '(REQUIRED)',
          lastName: '(REQUIRED)',
          username: '(REQUIRED)',
        },
        // optional
        optional: {
          bmi: '(NOT REQUIRED)',
          weight: '(NOT REQUIRED)',
          height: '(NOT REQUIRED)',
          phoneNumber: '(NOT REQUIRED)',
          id: '(NOT REQUIRED)',
          email: '(NOT REQUIRED)',
          createdAt: '(NOT REQUIRED)',
          profileImage: '(NOT REQUIRED)',
          enrolledCourses: '(NOT REQUIRED)',
        },
      },
      return: `{
        bmi: number | null;
        createdAt: string;
        email: string | null;
        enrolledCourses: Json[] | null;
        firstName: string | null;
        height: number | null;
        id: string;
        lastName: string | null;
        phoneNumber: string | null;
        profileImage: string | null;
        username: string | null;
        weight: number | null;
      }[] | null`,
    },
  ];
  return res.json(result);
});

// Get all users with limit, and current index for paging
router.get('/:from&:to', async (req: Request<GetAllUsersWithIndexTypeRequestParams, {}, GetAllUsersWithIndexTypeRequestParams>, res: Response<Tables<'users'>[] | ErrorResponseType>) => {
  const { from, to } = req.params;
  const { data, error } = await supabase.from('users').select('*').order('firstName', { ascending: true, nullsFirst: false }).range(from, to);
  if (data == null) {
    return res.json({ error: error.message, stack: error.details, code: 400 });
  }
  return res.json(data);
});

// Create a user
router.post('/', async (req: Request<{}, {}, CreateUserRequestBody>, res: Response<MessageResponse | ErrorResponseType>) => {
  let { firstName, lastName, bmi, weight, height, username, phoneNumber, id, email, profileImage, enrolledCourses } = req.body;
  if (id == '') {
    id = generateUniqueIdFromHex();
  }
  if (!firstName || firstName.trim() === '') {
    return res.json({ error: 'Please provide a first name.', code: 400 });
  } else if (!lastName || lastName.trim() === '') {
    return res.json({ error: 'Please provide a last name.', code: 400 });
  } else if (!username || username.trim() === '') {
    return res.json({ error: 'Please provide a username.', code: 400 });
  } else if (!email || email.trim() === '') {
    return res.json({ error: 'Please provide an email.', code: 400 });
  } else if (height && weight && bmi === 0) {
    bmi = weight / (Math.pow(height, 2));
  }
  const { error, status, statusText } = await supabase.from('users').insert({ firstName, lastName, bmi, weight, height, username, phoneNumber, id, email, profileImage, enrolledCourses });
  console.log({ error, status, statusText });
  if (statusText === 'Created') {
    return res.json({ message: 'Created user successfully !' });
  } else if (error) return res.json({ error: error.message, code: 400, stack: error.details });
});

export default router;
