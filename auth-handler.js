// auth-handler.js
import { supabase } from './supabase-client.js';

export async function handleAdminAccess() {
    // Check if user is authenticated
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (!user) {
        // Redirect to login page
        window.location.href = 'admin-login.html';
        return;
    }
    
    // Check if user has admin role
    const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();
    
    if (profile?.role === 'admin') {
        // Redirect to admin dashboard
        window.location.href = 'admin-dashboard.html';
    } else {
        alert('Access denied. Admin privileges required.');
    }
}

// Add event listener to admin button
document.addEventListener('DOMContentLoaded', function() {
    const adminBtn = document.getElementById('admin-access-btn');
    if (adminBtn) {
        adminBtn.addEventListener('click', handleAdminAccess);
    }
});
