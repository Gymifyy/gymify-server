import { NextApiRequest, NextApiResponse } from "next";

type ApiHelperResponse = Array<{ path: string, description: string, method: 'GET' | 'POST', usage: string, return: string, payload?: {} }>;
export default function helper(req: NextApiRequest, res: NextApiResponse) {

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
}
