package com.e_commerce.middleware;

import com.e_commerce.model.CategoryNode;
import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;

import java.io.IOException;

public class CustomSerializer extends StdSerializer<CategoryNode> {

    public CustomSerializer() {
        this(null);
    }

    public CustomSerializer(Class<CategoryNode> t) {
        super(t);
    }

    @Override
    public void serialize(CategoryNode categoryNode, JsonGenerator gen, SerializerProvider provider) throws IOException {
        gen.writeStartObject();
        gen.writeStringField("id", categoryNode.getId());
        gen.writeStringField("category", categoryNode.getCategory());
        gen.writeFieldName("products");
        gen.writeObject(categoryNode.getProducts());
        gen.writeEndObject();
    }
}
