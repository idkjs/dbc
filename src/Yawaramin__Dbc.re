[@bs.new] external typeError: string => exn = "TypeError";
let error = message => message |> typeError |> raise;

let contract = (~pre, ~post, body) => {
  pre
  |> Js.Array.forEach(((message, condition)) =>
       if (!condition) {
         error({j|Precondition broken: $message|j});
       }
     );

  post(. body)
  |> Js.Array.forEach(((message, condition)) =>
       if (!condition) {
         error({j|Postcondition broken: $message|j});
       }
     );

  body;
};

let noPost = () => (. _) => [||];

let pre = (~message="(no description)", condition) =>
  if (!condition) {
    error({j|Precondition broken: $message|j});
  };

let post = (~message="(no description)", func) =>
  (. result) =>
    if (func(. result)) {
      result;
    } else {
      error({j|Postcondition broken: $message|j});
    };
