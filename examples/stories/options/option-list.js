export default [
  {},
  { integer: true, positive: true, fixed: 0, flag: true },
  {
    integer: true,
    positive: true,
    fixed: 0,
    flag: true,
    minimum: -100,
    maximum: 100,
  },
  {
    schema: {
      integer: true,
      minimum: -100,
      maximum: 100,
    },
  },
]
