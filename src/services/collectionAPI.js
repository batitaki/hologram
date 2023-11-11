const getCollection = async () => {

      try {
             const collectionAwnser = await fetch ('http://localhost:3002/obras/obras')
             const data = await collectionAwnser.json();
             return data;

           } catch (error) {
             console.error ('Error at geting collection')
             return [];
           }
        };

        export default { getCollection }


