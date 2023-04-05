import { rest } from "msw";
const url = 'http://localhost:5000/';
export const handlers = [
  // Handles a POST /login request
  rest.get(`${url}get_all_parking_places`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json([{
            id: 1,
            city: "Bangalore",
            name: "Chinnaswamy Stadium",
          },
          {
            id: 2,
            city: "Mumbai",
            name: "Wankade",
          },
          {
            id: 3,
            city: "London",
            name: "lords",
          },
        ])
    );
  }),
  rest.get(`${url}get_all_slots_by_parking`, (req, res, ctx) => {
    console.log(req.url.searchParams.get('parking_id'));
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        "1": [
            {
                "id": 1,
                "in_use": true,
                "is_empty": true,
                "size": "small",
                "floor_name": "1",
                "slot_number": "1",
                "p_id": 1
            },{
                "id": 2,
                "in_use": true,
                "is_empty": true,
                "size": "small",
                "floor_name": "1",
                "slot_number": "2",
                "p_id": 1
            },
        ],
        "2": [
            {
                "id": 3,
                "in_use": true,
                "is_empty": true,
                "size": "small",
                "floor_name": "2",
                "slot_number": "3",
                "p_id": 1
            },{
                "id": 4,
                "in_use": true,
                "is_empty": true,
                "size": "small",
                "floor_name": "2",
                "slot_number": "4",
                "p_id": 1
            },
        ]
      })
    );
  }),

  rest.post(`${url}leave_from_parking`, (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        "message": "parking slot 2 is available now"
    })
    );
  }),
  rest.get(`${url}get_parking_slots_by_size`, (req, res, ctx) => {
    console.log(req.url.searchParams.get('parking_id'));
    console.log(req.url.searchParams.get('size'));
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        "slot": {
            "id": 1,
            "in_use": true,
            "is_empty": true,
            "size": "small",
            "floor_name": "1",
            "slot_number": "1",
            "p_id": 1
        },
        "message": "Your car parking slot is: floor no: 1 - Slot no: 1"
    })
    );
  }),
];
