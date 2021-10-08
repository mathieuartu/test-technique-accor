import users from '../data/users'

export const getUsers = () => {
	return users.users;
}

export default {
	getUsers,
}