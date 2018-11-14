
export const createUser = user => {
  return $.ajax({
    method: "POST",
    url: 'api/users',
    data: { user }
  });
};


export const updateUser = user => {
  return $.ajax({
    method: "PATCH",
    url: `api/users/${user.id}`,
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
