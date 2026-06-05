"use server";

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function registerUser(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const companyName = formData.get('companyName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password || !firstName || !lastName) {
    return { error: 'Missing required fields' };
  }

  const supabase = await createClient();

  // 1. Create the user in Auth
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  });

  if (authError || !authData.user) {
    return { error: authError?.message || 'Failed to create user' };
  }

  // 2. Insert into profiles table
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      first_name: firstName,
      last_name: lastName,
      company_name: companyName
    });

  if (profileError) {
    console.error("Profile creation error:", profileError);
    // Continue anyway since auth succeeded
  }

  // 3. Create initial mock transactions for the new user so the dashboard isn't empty
  const today = new Date().toISOString().split('T')[0];
  await supabase
    .from('transactions')
    .insert([
      { user_id: authData.user.id, title: "Initial Capital", amount: 500000, date: today, type: "income" },
      { user_id: authData.user.id, title: "Office Setup", amount: 150000, date: today, type: "expense" }
    ]);

  redirect('/dashboard');
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  if (!email || !password) {
    return { error: 'Missing required fields' };
  }

  const supabase = await createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  redirect('/dashboard');
}

export async function logoutUser() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect('/login');
}
