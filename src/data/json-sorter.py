import argparse
import json
from os.path import exists
from io import StringIO

class JsonSorter(object):
    SUFFIX_OUT = '_sorted'
    
    def __init__(self):
        self._args = None
        self._json= None
        self._result= None
    
    def _parse(self):
        description = ( "basic JSON array sorter + duplicate remover" )
        epilog = ( "Sorts a JSON array of objects by a specific number property inside the objects and remove duplicates\n" )

        p = argparse.ArgumentParser(description=description, epilog=epilog, formatter_class=argparse.RawTextHelpFormatter)
        p.add_argument('-i',        '--input-file',     help="Input file" )
        p.add_argument('-o',        '--output-file',    help="Output file" )
        p.add_argument('-p',        '--property-name',  help="Property name", default="value")
        p.add_argument('-r',        '--reverse-order',  help="Reverse the order", action='store_true')
        p.add_argument('-lowest',   '--keep-lowest',    help="If a duplicate is found, keep the one with the lowest value", action='store_true')
        return p.parse_args()
    
    def _read_json(self, file):
        try:
            with open(file, 'r', encoding='UTF-8') as infile:
                print("reading file: %s" % (file))
                self._json= json.load(infile)
        except FileNotFoundError:
            print("file %s not found" % (file))
            pass
    
    def _getKey(self, key):
        val= float(key[self._args.property_name])
        if self._args.reverse_order:
            val= 1.0 - val
        return val

    def _sort_items(self):
        self._json.sort(key=lambda k: self._getKey(k))
        
    def _save_json(self, file):

        with open(file, 'w') as outfile:

            result= StringIO()
            json.dump(self._json, result)
            result_str= result.getvalue().replace("[{", "[\r\n    {").replace("}]", "}\r\n]").replace("}, ", "},\r\n    ")

            outfile.write(result_str)
            outfile.flush()
            outfile.close()
        
    def start(self):
        self._args = args = self._parse()
        input= args.input_file
        output= args.output_file
        
        if not '.' in input:
            input+= ".json"
        elif not input.endswith(".json"):
            input= input.rpartition('.')[0]
            input+= ".json"

        if '/' in __file__:
            input= __file__.rpartition('/')[0] + "/" + input
            
        if not output:
            output= input.rpartition('.')[0] + self.SUFFIX_OUT + ".json"
        elif not '.' in output:
            output+= ".json"
        elif not output.endswith(".json"):
            output= output.rpartition('.')[0]
            output+= ".json"
            
        if exists(input):
            self._read_json(input)
            self._sort_items()
            self._save_json(output)
        else:
            print("file %s not found" % (input))
        
if __name__ == "__main__":
    JsonSorter().start()