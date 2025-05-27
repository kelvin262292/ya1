export const checkPermission = (user: User, requiredRole: Role) => {
  return user.roles.includes(requiredRole);
};