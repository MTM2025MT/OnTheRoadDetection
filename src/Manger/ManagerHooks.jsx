import { useCallback, useEffect, useState } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

export function useGetAllRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const fetchRoles = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('Admin/GetAllRoles');
      setRoles(response.data);
    } catch (err) {
      console.error('Error fetching roles:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [axiosPrivate]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return { roles, loading, error, refetch: fetchRoles };
}
export function useGetAllUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const axiosPrivate = useAxiosPrivate();
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axiosPrivate.get('Admin/GetAllUsers');
      setUsers(response.data);
    } catch (err) {
      console.error('Error fetching users:', err);
      setError(err);
    } finally {
      setLoading(false);
    } 
  }, [axiosPrivate]);

  // Auto-fetch on mount
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return { users, loading, error, refetch: fetchUsers };
}

export function useAssignRole() {
  const axiosPrivate = useAxiosPrivate();

  const assignRole = async (userId, rolename) => {
    try {
      await axiosPrivate.post('Admin/AssignRole', {userId: userId, roleType: rolename });
    } catch (err) {
      console.error('Error assigning role:', err);
      throw err;
    }
  };
  return assignRole;
}
