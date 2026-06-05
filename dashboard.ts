"use server";

import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export async function getDashboardData() {
  const supabase = await createClient();

  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect('/login');
  }

  // Fetch profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('first_name, last_name, company_name')
    .eq('id', user.id)
    .single();

  // Fetch transactions
  const { data: transactions } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', user.id)
    .order('date', { ascending: false });

  const userTransactions = transactions || [];
  
  // Calculate stats
  const totalRevenue = userTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const totalExpenses = userTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + Number(curr.amount), 0);
  const gstPayable = totalRevenue * 0.18; // Mock calculation

  return {
    user: {
      firstName: profile?.first_name || '',
      lastName: profile?.last_name || '',
      companyName: profile?.company_name || '',
    },
    stats: {
      totalRevenue,
      totalExpenses,
      gstPayable
    },
    transactions: userTransactions
  };
}
