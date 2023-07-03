class Solution:
    def gcdOfStrings(self, str1: str, str2: str) -> str:
        # Look for a string that can divide the two strings without any remainder
        # Use shorter to divide longer if remainder check if a set of string in the shorter can divide the longer without any remainder then return that letter  else return shorter
        if len(str1) > len(str2):
            longer_word = str1
            shorter_word = str2
        else:
            longer_word = str2
            shorter_word = str1
        # convert the longer one to list and remove
        t = ''
        for letter in longer_word:
            t += letter + '#'
        list = t.split('#')
        list.pop()

        for letter in shorter_word:
            try:
                list.remove(letter)
            except:
                pass

        remainder = ''.join(list)
        if remainder == shorter_word:
            return shorter_word
        else:
            # remainder can divide the shorter without any remainder then return remainder else return ''

            formatted_string = ''
            for letter in shorter_word:
                formatted_string += letter + '#'
                shorter_word = formatted_string.split('#')
                shorter_word.pop()
            for letter in remainder:
                try:
                    shorter_word = [
                        value for value in shorter_word if value != letter]
                except:
                    pass
            if ''.join(shorter_word):
                return 'kk'
            return shorter_word
            # check if remainder can remove from shorter_word with no word remaining
            # then return remainder
            # else return ''


solution = Solution()
print(solution.gcdOfStrings('TAUXXTAUXXTAUXXTAUXXTAUXX',
      'TAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXXTAUXX'))
