import { NestFactory } from "@nestjs/core";
import { AppMpdule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { ValidationPipe } from "./pipes/validation.pipe";

async function start() {
    const PORT = process.env.PORT || 5000;
    const app = await NestFactory.create(AppMpdule);

    const config = new DocumentBuilder()
        .setTitle(`BACKEND взаимодействие с NEST SERVER`)
        .setDescription(`Документация REST API`)
        .setVersion(`1.0.0`)
        .addTag(`DrAR`)
        .build();

        
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(`/api/docs`, app, document);

    //app.useGlobalPipes(new ValidationPipe());

    await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();