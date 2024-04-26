import { ErrorResponseType } from "@/types/response";
import { supabase } from "@/utils/supabase";
import { generateUniqueIdFromHex } from "@/utils/utils";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse<ErrorResponseType>) {
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
  // check if user with this username exists
  const { data, error: err } = await supabase.from("users").select("*").eq("username", username);
  if (err) {
    return res.json({ error: err.message, code: 400, stack: err.details });
  }
  if (data === null && !err) {
    const { error, status, statusText } = await supabase.from('users').insert({ firstName, lastName, bmi, weight, height, username, phoneNumber, id, email, profileImage, enrolledCourses });
    console.log({ error, status, statusText });
    if (statusText === 'Created') {
      res.redirect(307, "/");
    }
    else if (error) return res.json({ error: error.message, code: 400, stack: error.details });
  }
  else return res.json({ error: "User with this username already exists. Please provide another username", code: 400 });
}
