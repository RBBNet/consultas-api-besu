const { 
  storeIntoArrays, 
  readLocalNodesAccessPointsFromFile, 
  mapAccountToInstituicao,
  makeRpcCall_signerMetrics 
} = require('./core.js');

async function main() {
  let instituicao = [];
  let enode = [];
  let account = [];

  function formatDate() {
    const now = new Date();
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0'); // Janeiro é 0
    const year = now.getFullYear().toString().slice(-2); // Os dois últimos dígitos

    return `${hour}:${minute}:${second} ${day}/${month}/${year}`;
  }

  const timeDateStamp = formatDate();

  await storeIntoArrays(instituicao, enode, account);
  const accountToInstituicao = await mapAccountToInstituicao(account, instituicao);
  
  // Leia apenas os nós que contêm 'Validator'
  const accessPoints = await readLocalNodesAccessPointsFromFile('localnodes.conf');
  
  // Filtrar pela primeira ocorrência do termo 'Validator'
  const validatorNode = accessPoints.find(point => point.nodeName.includes('Validator'));

  // Fazendo chamada RPC
  const rpcMethod = 'qbft_getSignerMetrics';
  const rpcData = await makeRpcCall_signerMetrics(validatorNode.host, validatorNode.port, rpcMethod);


  // Determine the maximum length for alignment
const maxLength = rpcData.reduce((max, val) => Math.max(max, (accountToInstituicao[val.address] || val.address).length), 0);



  // Filtrar a saída pela chave 'address' e substituir pelo nome da instituição
  if (rpcData && Array.isArray(rpcData)) {
    const filteredData = rpcData.map(data => {
      const address = accountToInstituicao[data.address] || data.address;
      const lastProposedBlockNumber = parseInt(data.lastProposedBlockNumber, 16); // Converting hex to decimal
      return `${address.padEnd(maxLength + 5)}[ Last Block: ${lastProposedBlockNumber} ]`;
   }).sort(); // Sort the data alphabetically
   

  const asciiArt = `
             _    _____ _                       __  __      _        _          
            | |  / ____(_)                     |  \\/  |    | |      (_)         
   __ _  ___| |_| (___  _  __ _ _ __   ___ _ __| \\  / | ___| |_ _ __ _  ___ ___ 
  / _\` |/ _ \\ __|\\___ \\| |/ _\` | '_ \\ / _ \\ '__| |\\/| |/ _ \\ __| '__| |/ __/ __|
 | (_| |  __/ |_ ____) | | (_| | | | |  __/ |  | |  | |  __/ |_| |  | | (__\\__ \\
  \\__, |\\___|\\__|_____/|_|\\__, |_| |_|\\___|_|  |_|  |_|\\___|\\__|_|  |_|\\___|___/
   __/ |                   __/ |                                                
  |___/                   |___/                                                 
  `;

  const lineCount = filteredData.length;  // Get the line count

  // Add the line count at the end
  const output = [
    asciiArt,
    `Last 100 blocks...\t\tTime: ${timeDateStamp}`,
    '',
    validatorNode.nodeName,
    '=====================================================',
    ...filteredData,
    '',  // Skip a line
    `== ${lineCount} Peers ==`  // Add the line count here
  ].join('\n');

  console.log(output);
} else {
  console.log('No data received from the RPC call.');
}

}

main();
