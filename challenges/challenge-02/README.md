# Daily Diet (API)

## Functional requirements

- [ ] It should be able to create a user
- [ ] It should be able to edit a _Meal_, allowing the user to change the whole content
- [ ] It should be able to delete a existing _Meal_
- [ ] It should be able to list a single _Meal_
- [ ] It should be able to list every _Meal_ of a specific user

## Non functional requirements (STACK)

The whole application is using Typescript for type safety

- Monorepo: Turbo

- Server: fastify

  - Loader: Tsx
  - Query builder: Knex
  - Database: PostgreSQL
  - Static build: Tsup

- Web application: Next.js

  - Context management: Zustand, React query
  - Styling: Tailwind CSS, PostCSS
  - Forms: Hook form, Zod resolver

- Validation: Zod
- Linting: Eslint, prettier
  - Rules: Rocketseat preset
- Testing: Vitest, supertest

## Business rules

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
