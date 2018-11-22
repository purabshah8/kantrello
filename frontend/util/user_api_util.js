export const searchUsers = searchString => {
  return $.ajax({
    method: "GET",
    url: `/api/users/?search=${searchString}`
  });
};

export const fetchUsers = boardId => {
  return $.ajax({
    method: "GET",
    url: `/api/boards/${boardId}/users`
  });
};


export const createUser = user => {
  return $.ajax({
    method: "POST",
    url: '/api/users',
    data: { user }
  });
};


export const updateUser = user => {
  return $.ajax({
    method: "PATCH",
    url: `/api/users/${user.id}`,
    data: { user }
  });
};

export const deleteUser = id => {
  return $.ajax({
    method: "DELETE",
    url: `api/users/${id}`
  });
};

export const logIn = user => {
  return $.ajax({
    method: "POST",
    url: '/api/session',
    data: { user },
  });
};

export const logOut = () => {
  return $.ajax({
    method: "DELETE",
    url: '/api/session',
  });
};
