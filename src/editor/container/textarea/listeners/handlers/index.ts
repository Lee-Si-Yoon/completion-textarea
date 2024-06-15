export const input = (e: InputEvent) => {
  const value = (e.target as any).value;

  console.log(value);
};

export const keyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Tab': {
      e.preventDefault();
      break;
    }

    default: {
      break;
    }
  }
};

export const focus = (e: FocusEvent, container: HTMLDivElement) => {
  container.style.outline = '1px solid pink';
};

export const blur = (e: FocusEvent, container: HTMLDivElement) => {
  container.style.outline = 'none';
};
