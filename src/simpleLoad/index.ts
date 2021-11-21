type Options = {
  insertInto?: string,
  inBody?: boolean,
  removeScript?: boolean,
};

interface ScriptOptions extends Options {
  callback?: (o: HTMLScriptElement) => void,
}

interface LinkOptions extends Options {
  callback?: (o: HTMLLinkElement) => void,
}

const placementNode = (opts: Options) => {
  if (opts.insertInto) {
    return document.querySelector(opts.insertInto);
  }
  return opts.inBody ? document.body : document.head;
};

const createScript = (attrs: {
  type: string,
  src: string,
}) => {
  const script = document.createElement('script');

  Object.keys(attrs).forEach((attr) => {
    const typedAttr = attr as keyof typeof attrs;
    script.setAttribute(attr, attrs[typedAttr]);
  });

  return script;
};

const createLink = (attrs: {
  rel: string,
  type: string,
  href: string,
}) => {
  const link = document.createElement('link');
  Object.keys(attrs).forEach((attr: string) => {
    const typedAttr = attr as keyof typeof attrs;
    link.setAttribute(attr, attrs[typedAttr]);
  });

  return link;
};

const initialScriptOptions: ScriptOptions = {
  insertInto: undefined,
  inBody: false,
  removeScript: false,
  callback: undefined,
};

export const loadScript = (src: string, options: ScriptOptions = initialScriptOptions): Promise<unknown> => {
  const where = placementNode(options);

  return new Promise((resolve, reject) => {
    const script = createScript({ type: 'text/javascript', src });

    script.addEventListener('load', () => {
      if (options.removeScript) where?.removeChild(script);
      if (options.callback) options.callback(script);
      resolve(options.removeScript ? undefined : script);
    });

    script.addEventListener('error', () => {
      where?.removeChild(script);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Error: loading script');
    });

    where?.appendChild(script);
  });
};

const initialLinkOptions: LinkOptions = {
  insertInto: undefined,
  inBody: false,
  removeScript: false,
  callback: undefined,
};

export const loadStyle = (href: string, options: LinkOptions = initialLinkOptions): Promise<any> => {
  const where = placementNode(options);

  return new Promise((resolve, reject) => {
    const link = createLink({ rel: 'stylesheet', type: 'text/css', href });

    link.addEventListener('load', () => {
      if (options.removeScript) where?.removeChild(link);
      if (options.callback) options.callback(link);
      resolve(options.removeScript ? undefined : link);
    });

    link.addEventListener('error', () => {
      where?.removeChild(link);
      // eslint-disable-next-line prefer-promise-reject-errors
      reject('Error: loading style');
    });

    where?.appendChild(link);
  });
};
