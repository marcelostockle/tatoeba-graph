package lsm.tatoeba;

import java.util.ArrayList;
import org.json.JSONObject;
import org.json.JSONArray;
public class Sentence {
    String content, lang;
    int id;
    private ArrayList<Integer> links;
    public Sentence(int id) {
        this.id = id;
        links = new ArrayList();
    }
    public void addLink(int linkID) {
        links.add(linkID);
    }
    public String stringLinks() {
        if (links.isEmpty())
            return "";
        String r = "";
        for (Integer i: links)
            r += " " + i;
        return r;
    }
    public JSONObject toJSONObject() {
        JSONObject obj = new JSONObject();
        obj.put("_id", id);
        obj.put("lang", lang);
        obj.put("content", content);
        JSONArray arr = new JSONArray();
        for (Integer i: links)
            arr.put(i);
        obj.put("links", arr);
        return obj;
    }
}
