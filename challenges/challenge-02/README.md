# Daily Diet (API)

## FR (REQUIREMENTS)

- [ ] It should be able to create a user
- [ ] It should be able to edit a _Meal_, allowing the user to change the whole content
- [ ] It should be able to delete a existing _Meal_
- [ ] It should be able to list a single _Meal_
- [ ] It should be able to list every _Meal_ of a specific user

## NFR (STACK)

-

## BR

- [ ] It should be able to create a new _Meal_ with the following data:

  ```json
  {
    "name": "string",
    "description": "string",
    "time_stamp": "date and hour",
    "is_part_of_diet": "boolean"
  }
  ```

  _obs: every meal should have a reference of the user_

- [ ] It should be able to retrieve the users metrics, such as:

  - Total of meals created
  - Total of meals in his diet
  - Total of meals outside of his diet
  - Best sequence of meals in his diet

- [ ] It should be able to identify the user between the requests
- [ ] The user can only visualize, edit, or delete the _Meals_ created by him
