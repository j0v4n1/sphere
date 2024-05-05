export const enum Role {
  USER = 'user',
  ADMIN = 'admin',
  SUPER_USER = 'superuser',
}

export type NavbarProps = {
  role: Role | null;
};
