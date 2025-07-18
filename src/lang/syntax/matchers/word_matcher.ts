import * as pt from "@xieyuheng/partech"
import { type Word } from "../../word/index.ts"

export function word_matcher(tree: pt.Tree): Word {
  return pt.matcher<Word>({
    "word:call": ({ name }, { span }) => ({
      "@type": "Word",
      "@kind": "Call",
      name: pt.str(name),
      span,
    }),
    "word:literal_node": ({ name }, { span }) => ({
      "@type": "Word",
      "@kind": "LiteralNode",
      name: pt.str(name),
      span,
    }),
    "word:builtin": ({ name }, { span }) => ({
      "@type": "Word",
      "@kind": "Builtin",
      name: pt.str(name),
      span,
    }),
    "word:local": ({ name }, { span }) => ({
      "@type": "Word",
      "@kind": "Local",
      name: pt.str(name),
      span,
    }),
    "word:port_push": ({ nodeName, portName }, { span }) => ({
      "@type": "Word",
      "@kind": "PortPush",
      nodeName: pt.str(nodeName),
      portName: pt.str(portName),
      span,
    }),
    "word:port_reconnect": ({ nodeName, portName }, { span }) => ({
      "@type": "Word",
      "@kind": "PortReconnect",
      nodeName: pt.str(nodeName),
      portName: pt.str(portName),
      span,
    }),
    "word:generate_type_var": ({ name }, { span }) => ({
      "@type": "Word",
      "@kind": "GenerateSymbol",
      name: pt.str(name),
      span,
    }),
    "word:label": ({ label }, { span }) => ({
      "@type": "Word",
      "@kind": "Label",
      label: pt.str(label),
      span,
    }),
    "word:label_is_important": ({ label }, { span }) => ({
      "@type": "Word",
      "@kind": "Label",
      label: pt.str(label),
      isImportant: true,
      span,
    }),
  })(tree)
}

export function words_matcher(tree: pt.Tree): Array<Word> {
  return pt.matcher({
    "words:words": ({ words }) =>
      pt.matchers.zero_or_more_matcher(words).map(word_matcher),
  })(tree)
}
