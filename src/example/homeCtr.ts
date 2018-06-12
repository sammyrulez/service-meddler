export function homeCtr() {
  return (req: any, res: any) => {
    res.json({
      message: 'Hello World!'
    });
  };
}