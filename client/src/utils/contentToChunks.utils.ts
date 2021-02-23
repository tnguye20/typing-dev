import { config } from "../shared";
const { CHUNK } = config;

function* foo(lst: string[], n: number) {
  for(let i = 0; i < lst.length; i += n) {
    yield lst.slice(i, i+n);
  }
}

const contentToChunks = (content: string, size: number = CHUNK): string[] => {
  const rs: string[] = [];
  const iterator = foo(content.split('\n'), size);
  while(true){
    const { value, done } = iterator.next();
    if (done) break;
    if (value) rs.push(value.join('\n'));
  }
  return rs;
};

export default contentToChunks;