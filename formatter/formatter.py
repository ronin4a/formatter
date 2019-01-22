"""Takes a file; creates indents around '{}' blocks and newlines around ';'

    Super brute force and janky.

    """
    
import sys
import argparse

def BracketIndent(file_contents):
    """Takes a raw string of file contents, return formatted string with:
        - newline + indents for each {
        - newline + indents for non-function use of (
        """
    file_list = file_contents.split('\n')

    _open_bracket_tokens_ = ['{']
    _close_bracket_tokens_ = ['}']

    # Separate out open/close brackets

    # Process open bracket
    new_algo_1 = file_contents.split('{')
    r_new_algo_1 = []
    for num_indents, line in enumerate(new_algo_1):
        # Do not want to include final line
        r_new_algo_1.append(line.strip())
        if num_indents == (len(new_algo_1) - 1):
            break
        if line.strip():
            r_new_algo_1.append('\n{\n')

    r_new_algo_1_str = ''.join(r_new_algo_1)

    # Process close bracket
    num_closed_brackets = r_new_algo_1_str.count('\n}\n')
    new_algo_2 = r_new_algo_1_str.split('}')
    r_new_algo_2 = []

    for num_indents, line in enumerate(new_algo_2):
        r_new_algo_2.append(line)
        # Do not want to include final line
        if num_indents == (len(new_algo_2) - 1):
            break
        r_new_algo_2.append('\n}\n')

    for filler in range(num_closed_brackets - len(r_new_algo_2)):
        r_new_algo_2.append('\n}\n')

    
    # Cleaned up string
    algo_str = ''.join(r_new_algo_2)


    # Process ;
    semicolon_list = algo_str.split(';')
    semicolon_str = ''
    for i, line in enumerate(semicolon_list):
        semicolon_str += line
        semicolon_str += ';\n'

    # Process indents
    algo_list = semicolon_str.split('\n')

    return_str = ''
    _indent_str_= '    '
    bracket_stack = []

    for token_str in algo_list:
        if token_str == '}':
            bracket_stack.pop()

        tmp_str = ''
        tmp_str += _indent_str_*len(bracket_stack)
        tmp_str += token_str
        tmp_str += '\n'
        return_str += tmp_str

        if token_str == '{':
            bracket_stack.append(token_str)

    return return_str

def TrimTo80Char(file_contents):
    """Takes a file and trims to 80 char. Assumes that \ is an escape for file
        to new line.
        """
    new_str = ''
    count_width = 0

    for i, word in enumerate(file_contents.split(' ')):

        if '\n' in word:
            count_width = 0
            count_width += len(word.split()[-1])
        else:
            count_width += len(word) + 1

        print("%s %s" %(count_width, word)) 

        if count_width >= 80:
            new_str += '\\\n'
            count_width = len(word) + 1

        new_str += word + ' '

    return new_str

def main():
    if (len(sys.argv) < 2):
        raise Exception("Not enough arguments; need at least one.")

    for f in sys.argv[1:]:
        print("Opening %s..." %(f))

        try:
            with open(f, mode='r') as read_file:
                file_contents = read_file.read().strip()

            """
            formatted_contents = BracketIndent(file_contents)
            write_file_name = 'bracket_indented_' + f
            print("Writing %s..." %(write_file_name))
            with open(write_file_name, mode='w') as write_file:
                write_file.write(formatted_contents)
            """

            formatted_contents = TrimTo80Char(file_contents)
            write_file_name = 'trimmed_' + f
            print("Writing %s..." %(write_file_name))
            with open(write_file_name, mode='w') as write_file:
                write_file.write(formatted_contents)

        except FileNotFoundError:
            print("%s is not a file." %(f))


if __name__=="__main__":

    parser = argparse.ArgumentParser(
            description="Reads files and formats them")

    parser.add_argument(
            "--set_width",
            help="Sets width to standard 80 char"
            )

    parser.add_argument(
            "--format_bracket",
            help="Newline and indent all { and }"
            )

    args = parser.parse_args()

    main()
