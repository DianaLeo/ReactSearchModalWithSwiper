## An auto-focusing issue with React Modal and Swiper

When dragging event occurs, the input field loses focus and auto-focus again, causing the input field flicks.

Swiper interactions cause modals rerender, but if the search component is not a modal, input.blur works fine.