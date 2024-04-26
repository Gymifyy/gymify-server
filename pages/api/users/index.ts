import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from '@/utils/supabase';
import { Tables } from '@/types/database.types';
import { ErrorResponseType } from '@/types/response';
type CreateUserRequestBody = Tables<'users'>;

// Get all users
export default async function handler(req: NextApiRequest, res: NextApiResponse<CreateUserRequestBody[] | ErrorResponseType>) {
  // get from and to parmas from query
  let { from, to } = req.query;
  // paginate users
  if (from && to) {
    try {
      const f: number = +from;
      const t: number = +to;
      if (isNaN(t) || isNaN(f)) {
        return res.json({ error: 'Something happened when converting params into integers.', code: 400 })
      }
      const { data, error } = await supabase.from('users').select('*').order('firstName', { ascending: true, nullsFirst: false }).range(f, t);
      if (data == null) {
        return res.json({ error: error.message, stack: error.details, code: 400 });
      }
      return res.json(data);
    }
    catch (error) {
      return res.json({ error: 'Something happened when converting params into integers.', code: 400, stack: `${error}` })
    }
  }
  // get all
  else {
    const { data, error } = await supabase.from('users').select('*').order('firstName', { ascending: true, nullsFirst: false });
    if (data == null) {
      return res.json({ error: error.message, stack: error.details, code: 400 });
    }
    return res.json(data);
  }
};
